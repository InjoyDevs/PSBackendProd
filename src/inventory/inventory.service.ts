import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdvsMgDevices } from 'src/device/entities/device.entity';
import { InventoryPropertyDto } from './dto/inventory-property.dto';
import {
  CreateInventoryDto,
  CreateInventoryResponseDto,
} from './dto/create-inventory.dto';
import { DockPointNozzleTankIngMapping } from 'src/device/entities/dock/dock_point_nozzle_tank_ing_mapping.entity';
import { AdvsMvDeviceIoDock } from 'src/device/entities/dock/advs_mv_device_io_dock.entity';
import { InvtTdDvsIngrBatchVolStat } from './entities/invt_td_dvs_ingr_batch_vol_stat.entity';
import { InvtTdIngredientBatch } from './entities/invt_td_ingredient_batch.entity';
import { IngrMgIngredients } from 'src/ingredient/entities/ingredient.entity';

@Injectable()
export class InventoryService {
  hubInventoryRepository: any;
  dataSource: any;
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(AdvsMgDevices)
    private readonly deviceRepository: Repository<AdvsMgDevices>,
    @InjectRepository(AdvsMvDeviceIoDock)
    private readonly advsMvDeviceIoDock: Repository<AdvsMvDeviceIoDock>,
    @InjectRepository(InvtTdDvsIngrBatchVolStat)
    private readonly invtTdDvsIngrBatchVolStat: Repository<InvtTdDvsIngrBatchVolStat>,
    @InjectRepository(InvtTdIngredientBatch)
    private readonly invtTdIngredientBatch: Repository<InvtTdIngredientBatch>,
    @InjectRepository(IngrMgIngredients)
    private readonly ingrMgIngredients: Repository<IngrMgIngredients>,
  ) {}

  async createInventory(
    inventory: CreateInventoryDto,
  ): Promise<CreateInventoryResponseDto> {
    const validatedDeviceData = await this.deviceRepository.findOne({
      where: {
        device_id: inventory.deviceId.toString(),
      },
    });
    if (validatedDeviceData === null) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'No Device Found',
      });
    }
    if (validatedDeviceData.is_in_service === false) {
      throw new UnprocessableEntityException({
        status: 'FAILED',
        message: 'Device is not active',
      });
    }

    const validatedDockData = await this.advsMvDeviceIoDock.findOne({
      where: {
        device_id: inventory.deviceId,
      },
    });
    if (validatedDockData === null) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'No Dock Found',
      });
    }

    let dockTankMapping: DockPointNozzleTankIngMapping | null = null;
    for (
      let i = 0;
      i < validatedDockData.dockPointNozzleTankIngMappings.length;
      i++
    ) {
      if (
        validatedDockData.dockPointNozzleTankIngMappings[i].dock_point_id ===
          inventory.dockId &&
        validatedDockData.dockPointNozzleTankIngMappings[i]
          .tank_ing_mapping_id === inventory.tankId
      ) {
        dockTankMapping = validatedDockData.dockPointNozzleTankIngMappings[i];
        break;
      }
    }

    if (dockTankMapping === null) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'No Dock Tank Link Found',
      });
    }

    if (
      dockTankMapping.advsMtIngrTankLinking.tank.capacity < inventory.quantity
    ) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'Tank capacity reached will over flow',
      });
    }

    // TODO: Check if hub is having the content mentioned to send the fill request
    // TODO: Write algorithm to mask the current volume

    if (
      dockTankMapping.advsMtIngrTankLinking.ing_id !== inventory.ingredientId
    ) {
      throw new NotFoundException({
        status: 'FAILED',
        message: "Can't fill into the tank wrong ingredient id mentioned",
      });
    }

    const ingredientData = await this.ingrMgIngredients.findOne({
      where: {
        ing_id: inventory.ingredientId.toString(),
      },
    });

    if (ingredientData === null) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'Ingredient Data Not Found',
      });
    }

    // TODO: Get the latest volume present in inventory
    const inventoryIngredientVolumeData =
      await this.invtTdDvsIngrBatchVolStat.findOne({
        where: {
          ingredient_id: inventory.ingredientId,
          device_id: inventory.deviceId,
        },
      });

    const currentVolumeInTank =
      inventoryIngredientVolumeData?.current_volume || 0;
    // TODO: Write algorithm to normalize the value and pass the condition till 5% less check and
    // store the value to a variable
    if (
      currentVolumeInTank + inventory.quantity >
      dockTankMapping.advsMtIngrTankLinking.tank.capacity
    ) {
      throw new NotFoundException({
        status: 'FAILED',
        message: 'Tank capacity reached will over flow',
      });
    }

    // TODO: Send the instruction to fill the tank
    // TODO: Check for the status of the transfer

    // TODO: Create batch and link them to the inventory
    const newBatch = this.invtTdIngredientBatch.create({
      // batch_id: `BATCH_${inventory.ingredientId}_${new Date().toISOString()}`,
      ingredient_id: inventory.ingredientId,
      qty: inventory.quantity,
      expiry_date: inventory.expiration.toString(),
    });

    newBatch.batch_id = newBatch.id.toString();
    await this.invtTdIngredientBatch.save(newBatch);

    await this.invtTdDvsIngrBatchVolStat.save(
      this.invtTdDvsIngrBatchVolStat.create({
        device_id: inventory.deviceId,
        ingredient_id: inventory.ingredientId,
        current_batch_id: newBatch.id,
        current_volume: inventory.quantity + currentVolumeInTank,
        ingredient: ingredientData,
        currentBatch: newBatch,
      }),
    );

    const inventoryData = await this.inventoryRepository.save(
      this.inventoryRepository.create({
        ingredientId: inventory.ingredientId,
        currentVolume: inventory.quantity + currentVolumeInTank,
        capacity: dockTankMapping.advsMtIngrTankLinking.tank.capacity,
        deviceId: validatedDeviceData.id,
      }),
    );

    return {
      status: 'SUCCESS',
      message: 'Inventory Intialized successfully',
      data: {
        inventoryId: inventoryData.id,
      },
    };
  }

  async getInventoriesByIds(ids: number[]): Promise<Inventory[]> {
    const inventory = await this.inventoryRepository.findBy({
      id: In(ids),
    });
    if (!inventory) {
      throw new NotFoundException('Inventory not found');
    }
    return inventory;
  }

  async proprietaryServiceInitializeInventory(deviceId: number) {
    const findInventory = await this.inventoryRepository.findOne({
      where: { deviceId },
    });
    if (!findInventory)
      throw new NotFoundException(
        `Inventory associated with device id ${deviceId} not found`,
      );
    // TODO:
    // Load In-memory following items
    // a) Device (Hub & Dispenser) Current Inventory
    // b) Ingredient Batch Properties
    // c) Keep Encrypted Persistent Snapshot Copy"
  }

  async initializeAllInventories() {
    // TODO: Implement logic to "Set Value for ALL device inventory"
  }

  // ------------------------get level ---------------------
  async getLevel(inventoryId: number) {
    // console.log('this if get  level');
    const inventoryData = await this.inventoryRepository.findOne({
      where: {
        id: inventoryId,
      },
    });
    // console.log({ inventoryData });
    if (!inventoryData) {
      throw new NotFoundException();
    }
    // Get current level
    let currentLevel = inventoryData.currentVolume;
    // Manipulate it randomly
    currentLevel += Math.random() * 10 - 7;

    // TODO:
    // Hub and despenser Policy will be different
    // hub actuall no issue we need actual level
    // only need dispenser
    // update its policy it
    // micro-liter drops

    // Bound check
    currentLevel = Math.max(0, Math.min(currentLevel, inventoryData.capacity));
    // console.log(currentLevel);
    return currentLevel;
  }

  // --------------------- Set Level -----------------------------

  async setLevel(inventoryId: number, newLevel: number) {
    // 1. Find inventory record by ID
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });

    // 2. Verify inventory record was found
    if (!inventory) {
      throw new NotFoundException(`Inventory ${inventoryId} not found`);
    }

    // 3. Validate new level is within bounds
    if (newLevel < 0 || newLevel > inventory.capacity) {
      throw new BadRequestException('Level out of bounds');
    }
    // 4. Update the level value
    inventory.level = newLevel;

    // 5. Persist the updated inventory
    await this.inventoryRepository.save(inventory);
  }

  // -----------------alter level -----------------------------

  // TODO:
  // require rights for api call for
  // dispenser has right for all

  async alterLevel(inventoryId: number, change: number, isPositive: boolean) {
    // Fetch inventory entity by ID
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });

    //  TODO:
    //  it should update alter level and set level in the main server

    // Throw error if inventory not found
    if (!inventory) {
      throw new NotFoundException();
    }

    // Calculate amount to change based on percentage of current level
    let amount = inventory.level * change;

    // Negate amount if change is negative
    if (!isPositive) {
      amount *= -1;
    }

    // Calculate new level by adding change amount
    const newLevel = inventory.level + amount;

    // Clamp new level between min and max bounds
    inventory.level = Math.max(0, Math.min(newLevel, inventory.capacity));

    // Persist the updated inventory
    await this.inventoryRepository.save(inventory);
  }

  getProperties() {
    // TODO: Implement the logic to fetch encrypted properties for all batches
    return;
  }

  setProperties(inventoryPropertyDto: InventoryPropertyDto) {
    inventoryPropertyDto.batchId;
    // TODO: Implement the logic to set encrypted properties for a specific batch
    return;
  }

  setPropertiesBatch(inventorySetPropertyDto: InventoryPropertyDto) {
    inventorySetPropertyDto.batchId;
    // TODO: Implement the logic to set encrypted properties for a specific batch
    // 1. Decrypt received data using private key
    // 2. Perform additional encryption before storing
    // 3. Update storage with the encrypted data
    // 4. Return success or failure
    return;
  }

  storeValue(inventoryStoreValueDto: InventoryPropertyDto) {
    inventoryStoreValueDto.batchId;
    // TODO: Implement the logic to store data in the main database
    // The return value should be a list of IngredientBatch objects corresponding to the deviceId
    return;
  }

  updateValue(inventoryUpdateValueDto: InventoryPropertyDto) {
    inventoryUpdateValueDto.batchId;
    // TODO: Implement the logic to create a new batch property value for given mix of two batches
    // The return value should be the updated IngredientBatch
    return;
  }

  async resetInventory() {
    // TODO: Implement reset of inventory.
  }
}
