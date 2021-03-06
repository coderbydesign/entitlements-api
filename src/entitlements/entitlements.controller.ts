import { userInfo } from "os";
import { hasSmartManagement } from "../subscriptions/subscription.services";
import Request from "../types/RequestType";
import Response from "../types/ResponseType";
import log from "../util/log";
/**
 *
 * @param req
 */
function hasValidAccountNumber(req: Request) {
    return req.identity.account_number > -1;
}

/**
 * /v1/services endpoint
 * returns an object with entitlements that have a is_entitled flag as true or false
 *
 * @param req
 * @param res
 */
export async function getEntitlements(req: Request, res: Response) {

    const hasSmartManagementSub = await hasSmartManagement(req);

    const entitlements = {
        // requires only a valid username/password which is verified before hitting endpoint
        hybrid_cloud: {
            is_entitled: true
        },
        insights: {
            is_entitled: hasValidAccountNumber(req)
        },
        // requires only a valid username/password which is verified before hitting endpoint
        openshift: {
            is_entitled: true
        },
        smart_management: {
            is_entitled: hasSmartManagementSub
        }
    };

    return res.json(entitlements);
}
