import { Admin } from "./admin.model";
import {ChatInteraction} from "./chat-interactions.model"
import {ChatMessage} from "./chat-messages.model"
import {CommentReport} from "./comment-report.model"
import {Cooperate} from "./cooperate.model"
import {Coupon} from "./coupon.model"
import {Delegate} from "./delegate.model"
import {ExhibitorContact} from "./exhibitor-contact.model"
import {ExhibitorContractor} from "./exhibitor-contractor.model"
import {ExhibitorManning} from "./exhibitor-manning.model"
import {ExhibitorPassport} from "./exhibitor-passport.model";
import {ExhibitorPrinciple} from "./exhibitor-principles.model";
import {Exhibitor} from "./exhibitor.model";
import {Bookmark} from "./exhibitor_bookmark.model"
import {E_Visitor} from "./exhibitor_visited.model"
import {Forget_password} from "./forgetPasswordRequest.model";
import {Hall} from "./hall.model";
import {loginOtp} from "./login-otp.model";
import {Notification} from "./notification.model"
import {OEMRemark} from "./oem-remark.model"
import {otp} from "./otp.model"
import {Permission} from "./permission.model";
import {PostReport} from "./post-report"
import {Post} from "./post.model";
import {Comment} from "./post_comment.model";
import {Like} from "./post_like.model";
import {resetPasswordOtp} from "./reset-password-otp.model";
import {Session} from "./session.model";
import {SessionDocument}  from "./session_document.model";
import {Setting} from "./setting.model"
import {Speaker} from "./speaker.model";
import {Sponser} from "./sponser.model";
import {Stall} from "./stall.model";
import {StallPref} from "./stall_pref.model"
import { Users} from "./user.model"
import {Vendor} from "./vendor.model"
import {VendorOrder} from "./vendorOrder-remark"
import { VendorOrderRemark} from "./vendorOrder.model"
import {VendorOrderItem} from "./vendorOrderItem.model"
import {vendor_product} from "./vendorProduct.model"
import {verified} from "./verified.model"
import {visitorInOtp} from "./visitor-incomplete-form-otp.model";
import {visitorOtp} from "./visitor-otp.model";
import {Visitor} from "./visitor.model";
export default [
    Admin,
    Bookmark,
    ChatInteraction,
     ChatMessage,
     Comment,
     CommentReport,
     Cooperate,
     Coupon,
     Delegate,
     E_Visitor,
     Exhibitor,
     ExhibitorContact,ExhibitorContractor,
     ExhibitorManning,ExhibitorPassport,
     ExhibitorPrinciple,
     Forget_password,
     Hall,
     Like,
     Notification,
     OEMRemark,
     Permission,
     Post,
     PostReport,
     Session,
     SessionDocument,
     Setting,
     Speaker,
    Sponser,
    Stall,
    StallPref,
    Users,
   Vendor,
   VendorOrder,
   VendorOrderItem,
   VendorOrderRemark,
   Visitor,
   loginOtp,
   otp,
   resetPasswordOtp,
   vendor_product,
   verified,
   visitorInOtp,
   visitorOtp
    

]