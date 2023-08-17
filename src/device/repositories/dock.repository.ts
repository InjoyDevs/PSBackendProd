import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { AdvsMvIoDockPartsLink } from "../entities/dock/advs_mv_io_dock_parts_link.entity";
import { DockRepositoryInterface } from "../interfaces/dock-repository.interface";

@Injectable()
export class DockRepository extends Repository<AdvsMvIoDockPartsLink> implements DockRepositoryInterface {

    constructor(
        private dataSource : DataSource
    ) {
        super(AdvsMvIoDockPartsLink, dataSource.createEntityManager())
    }

    async softDeleteDock(id: number): Promise<boolean> {
        const response = await this.softDelete(id)
        return response !== null;
    }
    intializeDock() {
        throw new Error("Method not implemented.");
    }
    updateDockStatus() {
        throw new Error("Method not implemented.");
    }
    updateDock() {
        throw new Error("Method not implemented.");
    }
    getDock() {
        throw new Error("Method not implemented.");
    }
    getDevicesDock() {
        throw new Error("Method not implemented.");
    }
    getDockPublicKey() {
        throw new Error("Method not implemented.");
    }
    
}