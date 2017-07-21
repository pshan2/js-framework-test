import {Folder} from './folder';

class File{
    name: string;
    parentFolder: Folder;
    type: {'css','javascript','velocity','dd', 'html', 'other'};
    content: string;
    encoding: string;
    version: number;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    markAsExport: boolean;
}

export class Velocity extends File{
    parseForVeloctiy(content){
        /*
        return veloctiy code
        */
    }
}

export class DD extends File{
    parseForDD(content){
        /**
         * return XML code for data definition
         */
    }
}