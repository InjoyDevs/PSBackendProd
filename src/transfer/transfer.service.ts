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
import { Device } from 'src/device/entities/device.entity';
import { Recipe } from 'src/recipe/entities/recipe.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async createTransfer(transfer: Transfer): Promise<Transfer> {
    return await this.transferRepository.save(transfer);
  }

  transferGetQtySetForRefill(transferRefillDto: TransferGetQtySetForRefillDto) {
    const findHub = transferRefillDto.dockId; // implement entity for hub

    const findDock = undefined; // implement entity for dock

    const findDispenser = undefined; // implement entity for dispenser

    if (!findHub || !findDock || !findDispenser)
      throw new NotFoundException('Hub, dock or dispenser not found');

    // TODO:
    // Implement the service so that "It takes details of quantity to be refilled and returns encrypted message for specific device/dock-point"

    // TODO:
    // Implement it such that "It ensures there is random addition of quantities for each ingredient"

    // TODO:
    // Return: ""DeviceID, DockID, EncryptedMessage for Dock"
  }

  async transferGetQtySetForRecipe(
    recipeId: number,
    transferRecipeDto: TransferGetQtySetForRecipeDto,
  ) {
    const findRecipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!findRecipe)
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);

    const findDevice = await this.deviceRepository.findOne({
      where: { id: transferRecipeDto.deviceId },
    });
    if (!findDevice)
      throw new NotFoundException(
        `Device with id ${transferRecipeDto.deviceId} not found`,
      );

    // TODO:
    // Implement the service to transfer the service to return:
    // ""DeviceID, DockID, EncryptedMessage for Dock Gives encrypted message to be executed by Dock-Point Pumping systems"
  }

  async transferGetQtysetForTempRecipe(
    transferGetQtySetForTempRecipe: TransferGetQtySetForTempRecipe,
  ) {
    const findDevice = await this.deviceRepository.findOne({
      where: { id: transferGetQtySetForTempRecipe.deviceId },
    });

    if (!findDevice)
      throw new NotFoundException(
        `Device with id ${transferGetQtySetForTempRecipe.deviceId} not found`,
      );

    // TODO: This is to temperary Recipe (Personalization Test)

    // TODO: Return: ""DeviceID, DockID, EncryptedMessage for Dock"
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
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });
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
    const findDevice = await this.deviceRepository.findOne({
      where: { id: deviceId },
    });
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
