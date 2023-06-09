import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Exhibitor{
    @PrimaryGeneratedColumn()
    id:string; 
    @Column()
    firebaseToken:string;
    @Column()
    socket_id:string;
    @Column()
    company_repName:string;
    @Column()
    company_repProfile:string;
    @Column()
    about_me:string;
    @Column()
    company_name:string;
    @Column()
    blood_group:string;
    @Column()
    mobile_no:string;
    @Column()
    title:string;
    @Column()
    first_name:string;
    @Column()
    last_name:string;
    @Column()
    email:string;
    @Column()
    alternative_email:string;
    @Column()
    address_line1:string;
    @Column()
    address_line2:string;
    @Column()
    address_line3:string;
    @Column()
    fascia:string;
    @Column()
    website:string;
    @Column()
    designation:string;
    @Column()
    post_code:string;
    @Column()
    contact_person:string;
    @Column()
    catalogue_mobile_no:string;
    @Column()
    catalogue_email:string;
    @Column({type:'text'})
    contact_person_designation:string;
    @Column()
    gst:string;
    @Column()
    city:string;
    @Column()
    state:string;
    @Column()
    country:string;
    @Column()
    password:string;
    @Column()
    exhibitor:string;
    @Column()
    role:string;
    @Column()
    pro_category:string;
    @Column()
    company_profile:string;
    @Column()
    company_logo:string;
    @Column()
    is_confirmed:string;
    @Column()
    profile_completion:string;
    @Column()
    currentForm:string;
    @Column()
    currentFormIndex:string;
    @Column({type:'json'})
    host:string;
    @Column()
    host_qty:string;
    @Column()
    hostess_qty:string;
    @Column()
    single_phase_connection:string;
    @Column()
    three_phase_connection:string;
    @Column()
    booth_contractor_applicable:boolean;
    @Column()
    visa_applicable:string;
    @Column()
    furniture_applicable:string;
    @Column()
    indemnity_undertaking:string;
    @Column()
    fever:string;
    @Column()
    cough:string;
    @Column()
    breathlessness:string;
    @Column()
    sore_throat_running_nose:string;
    @Column()
    body_ache:string;
    @Column()
    other_symptom:string;
    @Column()
    health_undertaking_accepted:string;
    @Column()
    exhibitor_deliverables_correct:boolean;
    @Column()
    vaccine_certificate:Boolean;
    @Column()
    option_a:boolean;
    @Column()
    option_b:boolean;
    @Column()
    stall_design:string;
    @Column({
        default:false
    })
    stall_design_correct:boolean;
    @Column({
        default:false
    })
    oem_user_profile:boolean;
    @Column({
        default:false
    })
    oem_fascia:boolean;
    @Column({
        default:false
    })
    oem_exhibitor_badges:boolean;
    @Column({
        default:false
    })
    oem_power_requirement:boolean;
    @Column({
        default:false
    })
    oem_furniture_requirement:boolean;
    @Column({
        default:false
    })
    oem_host_hostess:boolean;
    @Column({
        default:false
    })
    oem_bare_space_stall_design:boolean;
    @Column({
        default:false
    })
    oem_booth_contractor:boolean;
    @Column({
        default:false
    })
    oem_catalog_entry:boolean;
    @Column({
        default:false
    })
    oem_visa:boolean;
    @Column({
        default:false
    })
    oem_indemnity_undertaking:boolean;
    @Column({
        default:false
    })
    oem_health_undertaking:boolean;
    @Column({
        default:false
    })
    oem_participation:boolean;
    @Column({
        default:false
    })
    account_deletion_request:boolean;
}