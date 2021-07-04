<template>
    <div class="user_block">
        <div class="top_block">
            <query-form></query-form>
        </div>
        <div class="main_block">
            <query-grid></query-grid>
        </div>
        <div class="dialog_block">
            <create-form></create-form>
        </div>
        <div class="dialog_block">
            <update-form></update-form>
        </div>
    </div>
</template>

<script>
import CreateForm from './modules/CreateForm'
import UpdateForm from './modules/UpdateForm'
import QueryGrid from './modules/QueryGrid'
import QueryForm from './modules/QueryForm'
export default {
    components: { 
        CreateForm,
        UpdateForm,
        QueryGrid, 
        QueryForm
    },
    data(){
        return {
            
        }
    },
    methods:{

    }
}
</script>

<style lang='less' scoped>
.top_block{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
}
.main_block{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
}
.dialog_block{
    width: 100%;
    height: 100%;
}
</style>