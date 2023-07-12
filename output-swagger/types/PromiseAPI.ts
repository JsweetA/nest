import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { User } from '../models/User';
import { ObservableDefaultApi } from './ObservableAPI';

import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";
export class PromiseDefaultApi {
    private api: ObservableDefaultApi

    public constructor(
        configuration: Configuration,
        requestFactory?: DefaultApiRequestFactory,
        responseProcessor?: DefaultApiResponseProcessor
    ) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public appControllerGetHello(_options?: Configuration): Promise<void> {
        const result = this.api.appControllerGetHello(_options);
        return result.toPromise();
    }


}



import { ObservableUserApi } from './ObservableAPI';

import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";
export class PromiseUserApi {
    private api: ObservableUserApi

    public constructor(
        configuration: Configuration,
        requestFactory?: UserApiRequestFactory,
        responseProcessor?: UserApiResponseProcessor
    ) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     */
    public userControllerFindAll(_options?: Configuration): Promise<void> {
        const result = this.api.userControllerFindAll(_options);
        return result.toPromise();
    }

    /**
     * @param username 
     * @param password 
     */
    public userControllerFindOne(username: string, password: string, _options?: Configuration): Promise<void> {
        const result = this.api.userControllerFindOne(username, password, _options);
        return result.toPromise();
    }

    /**
     * @param user 
     */
    public userControllerLogin(user: User, _options?: Configuration): Promise<void> {
        const result = this.api.userControllerLogin(user, _options);
        return result.toPromise();
    }

    /**
     * @param user 
     */
    public userControllerRegister(user: User, _options?: Configuration): Promise<void> {
        const result = this.api.userControllerRegister(user, _options);
        return result.toPromise();
    }

    /**
     * Get all user
     */
    public userControllerRoot(_options?: Configuration): Promise<void> {
        const result = this.api.userControllerRoot(_options);
        return result.toPromise();
    }


}



