const mutations = {
    setPageSize(state,val){
        state.pageSize = val;
    },
    setCurrentPage(state,val){
        state.currentPage = val;
    },
    setOptionList(state,val){
        state.optionList[val.name] = val.list
    },
    setOrderForm(state,val){
        state.orderForm.jobtype  = val.jobtype 
        state.orderForm.grade    = val.grade   
        state.orderForm.target   = val.target  
        state.orderForm.wordcount  = val.wordcount 
        state.orderForm.deadline = val.deadline
        console.log("setOrderForm",val)
    }
}

export default mutations