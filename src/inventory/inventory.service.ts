import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Device } from 'src/device/entities/device.entity';
import { InventoryPropertyDto } from './dto/inventory-property.dto';
import { RelativeLevelDTO } from './dto/relative-level.dto';
@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
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

  // async getLevel(deviceId: number) {
  //   const findDevice = await this.deviceRepository.findOne({
  //     where: { id: deviceId },
  //   });
  //   if (!findDevice) {
  //     throw new NotFoundException(`Device with id ${deviceId} not found`);
  //   }

  //   // TODO:
  //   // Implement the service such that:
  //   // "-> It always returns value after some random value manipulation
  //   // -> Run Random Recipe (will dispense all ingredient in any volume to ensure non-reversable engineering of algorithm)
  //   // -> (Hub Inventory is stored in main database)"
  // }

  // ------------------------get level ---------------------
  async getLevel(deviceId: number) {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });
    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    const currentInventory = findDevice.inventoryLevel;
    const manipulatedValue =
      currentInventory + Math.floor(Math.random() * 21) - 10;

    const ingredientsDispensed = this.runRandomRecipe();
    await this.updateHubInventory(ingredientsDispensed);

    return manipulatedValue;
  }

  private runRandomRecipe() {
    const ingredients = ['ingredient1', 'ingredient2', 'ingredient3'];
    const ingredientsDispensed = ingredients.map((ingredient) => ({
      ingredient,
      volume: Math.random() * 100,
    }));
    return ingredientsDispensed;
  }

  private async updateHubInventory(ingredientsDispensed) {
    const hubInventory: { ingredient: string; volume: number }[] = [];

    for (const dispensedIngredient of ingredientsDispensed) {
      const existingIngredient = hubInventory.find(
        (item) => item.ingredient === dispensedIngredient.ingredient,
      );

      if (existingIngredient) {
        existingIngredient.volume += dispensedIngredient.volume;
      } else {
        hubInventory.push(dispensedIngredient);
      }
    }

    console.log('Updated hub inventory:', hubInventory);

    // await this.hubInventoryRepository.save(hubInventory);
  }

  // ------------------set level old --------------------------

  // async setLevel(deviceId: number) {
  //   const findDevice = await this.deviceRepository.findOne({
  //     where: { id: deviceId },
  //   });
  //   if (!findDevice)
  //     throw new NotFoundException(`Device with id ${deviceId} not found`);

  //   // TODO:
  //   // Implement the service such that:
  //   // Set absolute value of inventory, but shall not be more than capacity or less than zero
  // }

  // --------------------- Set Level -----------------------------

  async setLevel(deviceId: number, level: number): Promise<void> {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    // Calculate the valid level within the range [0, capacity]
    const validLevel = Math.max(0, Math.min(level, findDevice.capacity));

    findDevice.inventory = validLevel;

    await this.deviceRepository.save(findDevice);
  }

  // --------------------------alter level old ------------------------
  // async alterLevel(deviceId: number) {
  //   const findDevice = await this.deviceRepository.findOne({
  //     where: { id: deviceId },
  //   });
  //   if (!findDevice)
  //     throw new NotFoundException(`Device with id ${deviceId} not found`);

  //   // TODO:
  //   // Implement the service such that:
  //   // Set relative change in value of inventory, but shall not be more than capacity or less than zero
  // }

  // -----------------alter level -----------------------------
  async alterLevel(deviceId: number, changeAmount: number) {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });
    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    // Calculate the new inventory level
    const newInventoryLevel = findDevice.inventory + changeAmount;

    // Ensure the new inventory level is within bounds (0 to capacity)
    const boundedInventoryLevel = Math.max(
      0,
      Math.min(newInventoryLevel, findDevice.capacity),
    );

    // Calculate the actual change applied to inventory
    const actualChange = boundedInventoryLevel - findDevice.inventory;

    // Update the inventory level in the database
    findDevice.inventory = boundedInventoryLevel;
    await this.deviceRepository.save(findDevice);

    return actualChange;
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
