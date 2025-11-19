export const empDetailsSubmit=[
   
    {
        label:"Name",
        name:"e_name",
        value:"",
        isError:false,
        errMsg:"* Name is required!",
        type:"text"
    },
    {
        label:"Email",
        name:"email",
        value:"",
        isError:false,
        errMsg:"* Email is required!",
        type:"email"
    },
    {
        label:"Role",
        name:"e_role",
        value:[],
        Options:["HR", "Manager", "Users"],
        isError:false,
        errMsg:"* Roll is required!",
        type:"select"
    },
    {
        label:"Designation",
        name:"designation",
        value:"",
        isError:false,
        errMsg:"* Designation is required!",
        type:"text"
    },
    {
        label:"Manager",
        name:"manager",
        value:[],
        Options:["Vikas", "Arun", "Robert"],
        isError:false,
        errMsg:"* must to select!",
        type:"select"
    },
    {
        label:"Location",
        name:"e_location",
        value:[],
        Options:["Vishakhapatnam", "Hyderabad"],
        isError:false,
        errMsg:"* must to select!",
        type:"select"
    },
    {
        label:"Contact",
        name:"contact",
        value:"",
        isError:false,
        errMsg:"* Contact number is required!",
        type:"number"
    },
    {
        label:"Gender",
        name:"gender",
        value:[],
        Options:["Male","Female","Others"],
        isError:false,
        errMsg:"* Must to pick one",
        type:"radio"
    },
    {
        label:"Project name",
        name:"project_name",
        value:"",
        isError:false,
        errMsg:"* Project name required",
        type:"text"
    },
    {
        label:"Joining date",
        name:"joining_date",
        value:"",
        isError:false,
        errMsg:"* Joining date is required!",
        type:"date"
    },
    {
        label:"Relieving date",
        name:"relieving_date",
        value:"",
        isError:false,
        errMsg:"* RelievingDate is required!",
        type:"date"
    },
    {
        label:"Blood group",
        name:"blood_group",
        value:[],
        Options:["AB+","A+","B+","O+","AB-","A-","B-","O-"],
        isError:false,
        errMsg:"* Blood group is required!",
        type:"select"
    },
    {
        label:"Photo",
        name:"photo",
        value:null,
        isError:false,
        errMsg:"* Photo is required!",
        type:"file"
    },
    {
        label:"Status",
        name:"status",
        value: [],
        Options:["Active", "Resigned","Relieved"],
        isError:false,
        errMsg:"* Must pick one!",
        type:"select"
    },
    {
        label:"Updated",
        name:"updated_date",
        value:"",
        isError:false,
        errMsg:"* Recent updated date is required!",
        type:"date"
    },
    {
        label:"Date of birth",
        name:"dob",
        value:"",
        isError:false,
        errMsg:"* Date of birth is required!",
        type:"date"
    },
    {
        label:"Anniversary date",
        name:"anniversary_date",
        value:"",
        isError:false,
        errMsg:"* Anniversary date is required!",
        type:"date"
    },
    {
        label:"Family Inforamation",
        name:"anniversaryDate",
    },
    {
        label:"Father name",
        name:"father_name",
        value:"",
        isError:false,
        errMsg:"* Father name is required!",
        type:"text"
    },
    {
        label:"Mother name",
        name:"mother_name",
        value:"",
        isError:false,
        errMsg:"* Mother name is required",
        type:"text"
    },
    {
        label:"Present address",
        name:"present_address",
        value:"",
        isError:false,
        errMsg:"* Present address is required",
        type:"textArea"
    },
    {
        label:"Permenant address",
        name:"permenant_address",
        value:"",
        isError:false,
        errMsg:"* Permenant address is required",
        type:"textArea"
    },
    {
        label:"Family Contact",
        name:"family_contact",
        value:"",
        isError:false,
        errMsg:"* Family contact is required",
        type:"number"
    }
]