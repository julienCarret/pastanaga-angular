import { SidebarComponent } from './sidebar.component';
export declare class SidebarService {
    private registry;
    constructor();
    register(key: string, sidebar: SidebarComponent): void;
    unregister(key: string): void;
    getSidebar(key: string): SidebarComponent | undefined;
    toggle(key: string, force?: boolean): void;
}
