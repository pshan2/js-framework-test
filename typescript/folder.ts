import {Site} from './site';

export class Folder{
    name: string;
    path: string;
    parentFolder: Folder;
    childFolders: [Folder];
    files: [string];
    site: string;
    version: number;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    readFolder(name, path){

    };
    writeFolder(name, path, folder){

    };
    deleteFolder(path, site){

    };
    reOrderFolder(files, name, path){

    };
    getFiles(name, path){

    };
}