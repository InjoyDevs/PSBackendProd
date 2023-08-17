export abstract class DockRepositoryInterface {
  abstract intializeDock();
  abstract updateDockStatus();
  abstract updateDock();
  abstract getDock();
  abstract getDevicesDock();
  abstract getDockPublicKey();
  abstract softDeleteDock(id: number): Promise<boolean>;
}
