import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transfer } from './entities/transfer.entity';
import {
  TransferGetQtySetForRefillDto,
  TransferGetQtySetForRecipeDto,
  TransferGetQtySetForTempRecipe,
  StartTransferDto,
  UpdateTransferDto,
} from './dto/transfer.dto';
import { DeviceService } from 'src/device/device.service';
import { Recipe } from 'src/recipe/entities/recipe.primary.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    private deviceService: DeviceService,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async createTransfer(transfer: Transfer): Promise<Transfer> {
    return await this.transferRepository.save(transfer);
  }

  async getAllRecipes(): Promise<{ name: string }[]> {
    const allRecipes = await this.recipeRepository.find();
    return allRecipes.map((recipe) => ({ name: recipe.name }));
  }

  async getAllIngredients(): Promise<{ volume: string }[]> {
    const allIngredients = await this.inventoryRepository.find();
    return allIngredients.map((ingredient) => ({
      volume: ingredient.currentVolume.toString(),
    }));
  }

  async transferGetQtySetForRefill(
    queryDto: TransferGetQtySetForRefillDto,
  ): Promise<any> {
    const { hubId, dockId, dispenserId, sourceDeviceId } = queryDto;
    try {
      const transferData = await this.transferRepository.findOne({
        where: {
          hubId: hubId,
          dockId: dockId,
          dispenserId: dispenserId,
          sourceDeviceId: sourceDeviceId,
        },
      });
      const allRecipes = await this.getAllRecipes();
      if (!transferData) {
        throw new NotFoundException('Data not found');
      }
      const allIngredients = await this.getAllIngredients();

      const encryptedMessage = await this.calculateEncryptedMessage(
        transferData.dockId,
      );

      return {
        deviceId: transferData.sourceDeviceId,
        recipeName: allRecipes,
        DockId: transferData.dockId,
        allIngredients: allIngredients,
        EncryptedMessage: encryptedMessage,
      };
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  async calculateEncryptedMessage(dockId: number) {
    return await `EncryptedMessageForDock_${dockId}`;
  }

  // -------------------------------Done--------------------------------------------

  async getRecipeById(id: number): Promise<{ name: string }> {
    const recipe = await this.recipeRepository.findOne({ where: { id: id } });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return { name: recipe.name };
  }

  async transferGetQtySetForRecipe(
    recipeId: number,
    queryDto: TransferGetQtySetForRecipeDto,
  ): Promise<any> {
    const { dockId } = queryDto;
    try {
      const transferData = await this.transferRepository.findOne({
        where: {
          dockId: dockId,
        },
      });

      if (!transferData) {
        throw new NotFoundException('Data not found');
      }

      const recipe = await this.getRecipeById(recipeId);
      const allIngredients = await this.getAllIngredients();
      const encryptedMessage = await this.calculateEncryptedMessage(
        transferData.dockId,
      );

      return {
        deviceId: transferData.sourceDeviceId,
        recipeName: recipe,
        DockId: transferData.dockId,
        allIngredients: allIngredients,
        EncryptedMessage: encryptedMessage,
      };
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  async getRecipeAndTransferData(
    recipeId: number,
    queryDto: TransferGetQtySetForRecipeDto,
  ): Promise<any> {
    return this.transferGetQtySetForRecipe(recipeId, queryDto);
  }

  // ------------------------------end--------------------------------------------
  // TODO:
  // memory database -> transaction start to end memory and completion in main database

  async transferGetQtySetForTempRecipe(
    recipeId: number,
    transferRecipeDto: TransferGetQtySetForTempRecipe,
  ): Promise<any> {
    const { dockId } = transferRecipeDto;
    try {
      const transferData = await this.transferRepository.findOne({
        where: {
          dockId: dockId,
        },
      });

      if (!transferData) {
        throw new NotFoundException('Data not found');
      }

      const recipe = await this.getRecipeById(recipeId);
      const allIngredients = await this.getAllIngredients();
      const encryptedMessage = await this.calculateEncryptedMessage(
        transferData.dockId,
      );

      return {
        deviceId: transferData.sourceDeviceId,
        recipeName: recipe,
        DockId: transferData.dockId,
        allIngredients: allIngredients,
        EncryptedMessage: encryptedMessage,
      };
    } catch (error) {
      throw new NotFoundException('Data not found');
    }
  }

  async startTransfer(deviceId: number, startTransferDto: StartTransferDto) {
    if (!startTransferDto)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: { startTransferDto: 'Empty' },
        },
        HttpStatus.BAD_REQUEST,
      );
    const findDevice = await this.deviceService.getDeviceById(deviceId);
    if (!findDevice)
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    // TODO: Implement start transfer service
  }

  async updateTransfer(deviceId: number, updateTransferDto: UpdateTransferDto) {
    if (!updateTransferDto)
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          errors: { startTransferDto: 'Empty' },
        },
        HttpStatus.BAD_REQUEST,
      );
    const findDevice = await this.deviceService.getDeviceById(deviceId);
    if (!findDevice)
      throw new NotFoundException(`Device with id ${deviceId} not found`);
    // TODO: Implement update transfer service
  }

  async pause(transferId: number): Promise<any> {
    const findTransfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });
    if (!findTransfer)
      throw new NotFoundException(`Transfer with id ${transferId} not found`);
    // TODO: Implement the logic for pausing a transfer
    return;
  }

  async resume(transferId: number): Promise<any> {
    const findTransfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });
    if (!findTransfer)
      throw new NotFoundException(`Transfer with id ${transferId} not found`);
    // TODO: Implement the logic for resuming a transfer
    return;
  }

  async complete(transferId: number): Promise<any> {
    const findTransfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });
    if (!findTransfer)
      throw new NotFoundException(`Transfer with id ${transferId} not found`);
    // TODO: Implement the logic for completing a transfer
    return;
  }

  async terminate(transferId: number): Promise<any> {
    const findTransfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });
    if (!findTransfer)
      throw new NotFoundException(`Transfer with id ${transferId} not found`);
    // TODO: Implement the logic for terminating a transfer
    return;
  }

  async timeout(transferId: number): Promise<any> {
    const findTransfer = await this.transferRepository.findOne({
      where: { id: transferId },
    });
    if (!findTransfer)
      throw new NotFoundException(`Transfer with id ${transferId} not found`);
    // TODO: Implement the logic for handling a transfer timeout
    return;
  }
}
