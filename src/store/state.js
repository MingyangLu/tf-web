const state = {
    pageSize:10,
    currentPage:1,
    optionList:{
        jobtype:[],
        grade:[],
        target:[]
    },
    orderForm:{
        email:'',
        wechatno:'',
        jobtype:'',
        grade:'',
        target:'',
        wordcount:'',
        deadline:''
    },
    orderList:{
        busino:'',
        procstate:'',
        custname:'',
        email:'',
        wechatno:'',
        jobtype:'',
        isurgent:'',
        grade:'',
        target:''
    }

}

export default state