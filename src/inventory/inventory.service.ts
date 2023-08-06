import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { Device } from 'src/device/entities/device.entity';
import { InventoryPropertyDto } from './dto/inventory-property.dto';

@Injectable()
export class InventoryService {
  hubInventoryRepository: any;
  dataSource: any;
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
  async getLevel(deviceId: number) {
    const device = await this.deviceRepository.findOne({
      where: {
        id: deviceId,
      },
    });

    if (!device) {
      throw new NotFoundException();
    }

    // Get current level
    let currentLevel = device.currentLevel;
    // Manipulate it randomly
    currentLevel += Math.random() * 10 - 5;

    // Bound check
    currentLevel = Math.max(0, Math.min(currentLevel, device.capacity));

    return currentLevel;
  }

  // --------------------- Set Level -----------------------------

  async setLevel(deviceId: number, level: number) {
    const device = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });

    if (!device) {
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    }

    const inventory = await this.inventoryRepository.findOne({
      where: {
        device: { id: deviceId },
      } as FindOptionsWhere<Inventory>,
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory for device ${deviceId} not found`);
    }

    if (level < 0 || level > device.capacity) {
      throw new BadRequestException('Level must be between 0 and capacity');
    }

    inventory.currentLevel = level;

    await this.inventoryRepository.save(inventory);
  }

  // -----------------alter level -----------------------------

  async alterLevel(deviceId: number, change: number) {
    const device = await this.deviceRepository.findOne({
      where: {
        id: deviceId,
      },
    });

    if (!device) {
      throw new NotFoundException();
    }

    // Get current level
    let currentLevel = device.currentLevel;

    // Apply change
    currentLevel += change;

    // Bound check
    currentLevel = Math.max(0, Math.min(currentLevel, device.capacity));

    // Update level
    device.currentLevel = currentLevel;

    await this.deviceRepository.save(device);
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
