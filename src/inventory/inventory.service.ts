import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Device } from 'src/device/entities/device.entity';
import { InventoryPropertyDto } from './dto/inventory-property.dto';
import { Exception } from 'handlebars';

@Injectable()
export class InventoryService {
  hubInventoryRepository: any;
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

  // ------------------------get level ---------------------
  async getLevel(deviceId: number): Promise<number> {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    const currentInventory = findDevice.inventoryLevel;
    const manipulatedValue = this.calculateManipulatedValue(currentInventory);

    const ingredientsDispensed = this.runRandomRecipe();
    await this.updateHubInventory(ingredientsDispensed);

    return manipulatedValue;
  }

  private calculateManipulatedValue(currentInventory: number): number {
    const randomChange = Math.floor(Math.random() * 21) - 10;
    return currentInventory + randomChange;
  }

  private runRandomRecipe(): { ingredient: string; volume: number }[] {
    const ingredients = ['ingredient1', 'ingredient2', 'ingredient3'];
    const ingredientsDispensed = ingredients.map((ingredient) => ({
      ingredient,
      volume: Math.random() * 100,
    }));
    return ingredientsDispensed;
  }

  private async updateHubInventory(
    ingredientsDispensed: {
      ingredient: string;
      volume: number;
    }[],
  ): Promise<void> {
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

    await this.hubInventoryRepository.save(hubInventory);
  }

  // --------------------- Set Level -----------------------------

  async setLevel(deviceId: number, inventoryId: number): Promise<void> {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    const findInventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });

    if (!findInventory) {
      throw new NotFoundException(`Inventory with id ${inventoryId} not found`);
    }

    if (
      findDevice.inventoryLevel > findDevice.capacity ||
      findDevice.inventoryLevel <= 0
    ) {
      throw new Error('Invalid inventory level');
    }

    findDevice.inventoryId = inventoryId;

    await this.deviceRepository.save(findDevice);
  }

  // -----------------alter level -----------------------------

  async alterLevel(deviceId: number, changeAmount: number) {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!findDevice) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    const newInventoryLevel = findDevice.inventory + changeAmount;
    const boundedInventoryLevel = Math.max(
      0,
      Math.min(newInventoryLevel, findDevice.capacity),
    );

    const actualChange = boundedInventoryLevel - findDevice.inventory;

    if (
      boundedInventoryLevel <= findDevice.capacity &&
      boundedInventoryLevel >= 0
    ) {
      findDevice.inventory = boundedInventoryLevel;
      await this.deviceRepository.save(findDevice);

      return actualChange;
    } else {
      throw new Exception('Invalid inventory change');
    }
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
