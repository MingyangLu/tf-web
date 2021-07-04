<template>
    <el-select v-model="select" class="select-style">
        <el-option
          v-for="(item, i) in optionList"
          :key="i"
          :label="item.label"
          :value="item.index"
        ></el-option>
    </el-select>
</template>

<script>
export default {
    props:{
        value:{
            default:'',
            type:String
        },
        option:{
            default:'',
            type:String
        }
    },
    model:{
        prop: 'value',
        event: 'change'
    },
    watch: {
            value: function (val) {
                this.select = val
            },
            select: function (val) {
                this.$emit('change',val);
            }
        },
    data(){
        return{
            optionList:[],
            select: this.value
        }
    },
    methods:{
        async getOptionList(option){
            console.log('进入tfselect')
            console.log('option',option)
            console.log('this.$store.state.optionList[option].length',this.$store.state.optionList[option].length)
            if(this.$store.state.optionList[option].length === 0){
                const { data: res } = await this.$http.post("/code/getCodeList", {
                    codeName: option,
                });
                if(res === undefined){
                    this.optionList = [{label:'暂无内容',value:''}]
                }else{
                    this.optionList = res.data
                    this.$store.commit('setOptionList',{
                        name: option,
                        list: this.optionList
                    })
                }
                
                console.log(res.data)
            }else{
                this.optionList = this.$store.state.optionList[option]
            }
        }
    },
    mounted(){
        this.getOptionList(this.option);
    }
}
</script>

<style>
/* .select-style{
    width: 100%;
} */
</style>