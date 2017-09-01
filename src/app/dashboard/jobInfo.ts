import { ProgressInfo } from './progressInfo';

export class JobInfo {
    id: string;
    uri: string;
    name: string;
    description: string;
    case: {
        id: string;
        uri: string;
        label: string;
    };
    start_datetime: string;
    end_datetime: string;
    status: string;
    thumbnail: string;
    progress: ProgressInfo;
}
