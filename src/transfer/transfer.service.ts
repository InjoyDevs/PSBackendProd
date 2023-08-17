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
import { RecipeService } from 'src/recipe/recipe.service';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    private deviceService: DeviceService,
    private recipeService: RecipeService,
  ) {}

  async createTransfer(transfer: Transfer): Promise<Transfer> {
    return await this.transferRepository.save(transfer);
  }

  async transferGetQtySetForRefill(
    transferRefillDto: TransferGetQtySetForRefillDto,
  ): Promise<string> {
    const findHub = transferRefillDto.hubId; // implement entity for hub
    const findDock = transferRefillDto.dockId; // implement entity for dock
    const findDispenser = transferRefillDto.dispenserId; // implement entity for dispenser

    if (!findHub || !findDock || !findDispenser)
      throw new NotFoundException('Hub, dock or dispenser not found');

    const encryptedMessage = await this.calculateEncryptedMessage(findDock);

    return `DeviceID: ${findDispenser}, DockID: ${findDock}, EncryptedMessage: ${encryptedMessage}`;
  }

  private calculateEncryptedMessage(dockId: number): string {
    return `EncryptedMessageForDock_${dockId}`;
  }

  async transferGetQtySetForRecipe(
    recipeId: number,
    transferRecipeDto: TransferGetQtySetForRecipeDto,
  ) {
    const findRecipe = await this.recipeService.findOne({
      where: { id: recipeId },
    });
    if (!findRecipe)
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);

    const findDevice = await this.deviceService.getDeviceById(
      transferRecipeDto.deviceId,
    );
    if (!findDevice)
      throw new NotFoundException(
        `Device with id ${transferRecipeDto.deviceId} not found`,
      );

    // TODO: Implement encryption logic here.
    // You can encrypt the data you want to transfer before creating the message.

    // TODO: Provide the Dock ID as needed.
    const dockId = 'Dock123'; // Replace with actual Dock ID.

    // TODO: Create the message to be executed by Dock-Point Pumping systems.
    const encryptedMessage = 'Encrypted message for Dock execution.';

    // Construct the transferred data message including Device ID, Dock ID, and Encrypted Message.
    const transferredData = `DeviceID: ${findDevice.id}, DockID: ${dockId}, EncryptedMessage: ${encryptedMessage}`;

    return transferredData;
  }

  async transferGetQtysetForTempRecipe(
    transferGetQtySetForTempRecipe: TransferGetQtySetForTempRecipe,
  ) {
    const findDevice = await this.deviceService.getDeviceById(
      transferGetQtySetForTempRecipe.deviceId,
    );

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
