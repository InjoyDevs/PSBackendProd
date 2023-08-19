export class DeviceInstructionFormatDto {
  deviceId: string;
  dockId: string;
  metaData: {
    instruction: string;
    inventoryId: string;
    pumpId: string;
    quantity: string;
    time: string;
    hubId: string;
  };
}
