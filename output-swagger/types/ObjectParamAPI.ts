import { ResponseContext, RequestContext, HttpFile } from '../http/http';
import * as models from '../models/all';
import { Configuration} from '../configuration'

import { User } from '../models/User';

import { ObservableDefaultApi } from "./ObservableAPI";
import { DefaultApiRequestFactory, DefaultApiResponseProcessor} from "../apis/DefaultApi";

export interface DefaultApiAppControllerGetHelloRequest {
}

export class ObjectDefaultApi {
    private api: ObservableDefaultApi

    public constructor(configuration: Configuration, requestFactory?: DefaultApiRequestFactory, responseProcessor?: DefaultApiResponseProcessor) {
        this.api = new ObservableDefaultApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public appControllerGetHello(param: DefaultApiAppControllerGetHelloRequest, options?: Configuration): Promise<void> {
        return this.api.appControllerGetHello( options).toPromise();
    }

}

import { ObservableUserApi } from "./ObservableAPI";
import { UserApiRequestFactory, UserApiResponseProcessor} from "../apis/UserApi";

export interface UserApiUserControllerFindAllRequest {
}

export interface UserApiUserControllerFindOneRequest {
    /**
     * 
     * @type string
     * @memberof UserApiuserControllerFindOne
     */
    username: string
    /**
     * 
     * @type string
     * @memberof UserApiuserControllerFindOne
     */
    password: string
}

export interface UserApiUserControllerLoginRequest {
    /**
     * 
     * @type User
     * @memberof UserApiuserControllerLogin
     */
    user: User
}

export interface UserApiUserControllerRegisterRequest {
    /**
     * 
     * @type User
     * @memberof UserApiuserControllerRegister
     */
    user: User
}

export interface UserApiUserControllerRootRequest {
}

export class ObjectUserApi {
    private api: ObservableUserApi

    public constructor(configuration: Configuration, requestFactory?: UserApiRequestFactory, responseProcessor?: UserApiResponseProcessor) {
        this.api = new ObservableUserApi(configuration, requestFactory, responseProcessor);
    }

    /**
     * @param param the request object
     */
    public userControllerFindAll(param: UserApiUserControllerFindAllRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerFindAll( options).toPromise();
    }

    /**
     * @param param the request object
     */
    public userControllerFindOne(param: UserApiUserControllerFindOneRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerFindOne(param.username, param.password,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public userControllerLogin(param: UserApiUserControllerLoginRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerLogin(param.user,  options).toPromise();
    }

    /**
     * @param param the request object
     */
    public userControllerRegister(param: UserApiUserControllerRegisterRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerRegister(param.user,  options).toPromise();
    }

    /**
     * Get all user
     * @param param the request object
     */
    public userControllerRoot(param: UserApiUserControllerRootRequest, options?: Configuration): Promise<void> {
        return this.api.userControllerRoot( options).toPromise();
    }

}
