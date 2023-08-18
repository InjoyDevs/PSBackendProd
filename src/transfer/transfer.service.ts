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

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    private transferRepository: Repository<Transfer>,
    private deviceService: DeviceService,
  ) {}

  async createTransfer(transfer: Transfer): Promise<Transfer> {
    return await this.transferRepository.save(transfer);
  }

  async transferGetQtySetForRefill(
    dto: TransferGetQtySetForRefillDto,
  ): Promise<string> {
    // Fetch the data from the database using the repository
    const transferData = await this.transferRepository.findOne({
      where: {
        hubId: dto.hubId,
        dockId: dto.dockId,
        dispenserId: dto.dispenserId,
      },
    });
    console.log(transferData);
    // console.log(dto);
    // Check if data was found, otherwise throw NotFoundException
    if (!transferData) {
      throw new NotFoundException('Data not found');
    }

    // Calculate the encrypted message
    const encryptedMessage = this.calculateEncryptedMessage(
      transferData.dockId,
    );

    // Return the result
    return `DeviceID: ${transferData.sourceDeviceId}, DockID: ${transferData.dockId}, EncryptedMessage: ${encryptedMessage}`;
  }

  private calculateEncryptedMessage(dockId: number): string {
    return `EncryptedMessageForDock_${dockId}`;
  }

  // -------------------------------Done--------------------------------------------

  async transferGetQtySetForRecipe(
    recipeId: number,
    dto: TransferGetQtySetForRecipeDto,
  ): Promise<string> {
    // Find the stored recipe based on recipeId
    const findRecipe = await this.transferRepository.findOne({
      where: {
        deviceId: dto.DeviceId,
        dockId: dto.dockId,
        recipeId: dto.recipeId,
      },
    });
    if (!findRecipe)
      throw new NotFoundException(`Recipe with id ${recipeId} not found`);
    console.log(recipeId, ' this is recipe id');
    // Find the device using the transferRecipeDto's recipeId
    const findDevice = await this.transferRepository.findOne({
      where: { id: recipeId },
    });
    if (!findDevice)
      throw new NotFoundException(`Quantity ${recipeId} not found`);
    console.log(findDevice, ' here is find device');
    // TODO: Implement encryption logic here.
    // You can encrypt the data you want to transfer before creating the message.
    console.log(dto.DeviceId, ' this is dto');
    const encryptedMessage = 'Encrypted message for Dock execution.';

    // Construct the transferred data message including Device ID, Dock ID, and Encrypted Message.
    const transferredData = `DeviceID: ${findRecipe.deviceId}, DockID: ${findRecipe.dockId}, EncryptedMessage: ${encryptedMessage}`;

    return transferredData;
  }

  // ------------------------------end--------------------------------------------

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
    const encryptedMessage = 'Encrypted message for Dock execution.';

    // Construct the transferred data message including Device ID, Dock ID, and Encrypted Message.
    const transferredData = `DeviceID: ${findDevice}, DockID: ${transferGetQtySetForTempRecipe.dockId}, EncryptedMessage: ${encryptedMessage}`;

    return transferredData;
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
