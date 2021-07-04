
import TfSelect from './TfSelect.vue'
const components = {   
    TfSelect
    };
const install = function(Vue, opts = {}) {    // eslint-disable-line no-unused-vars
    Object.keys(components).forEach((key) => {        
        Vue.component(key, components[key]);    
    });
};
export default install;