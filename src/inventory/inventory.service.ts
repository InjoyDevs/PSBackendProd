import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdvsMgDevices } from 'src/device/entities/device.entity';
import { InventoryPropertyDto } from './dto/inventory-property.dto';

@Injectable()
export class InventoryService {
  hubInventoryRepository: any;
  dataSource: any;
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(AdvsMgDevices)
    private deviceRepository: Repository<AdvsMgDevices>,
  ) {}

  async createInventory(inventory: Inventory): Promise<Inventory> {
    return await this.inventoryRepository.save(inventory);
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
    // Hub and despenser Policy willl be different
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
