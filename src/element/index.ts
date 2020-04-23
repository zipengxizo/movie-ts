import { VueConstructor } from "vue";
import {
    Pagination,
    Menu,
    Submenu,
    MenuItem,
    Alert,
    Icon,
    Header,
    Aside,
    Main,
    Table,
    TableColumn,
    Button,
    Container
  
  } from 'element-ui';


  const element = {
      install : function(Vue: VueConstructor){
        Vue.use(Pagination);
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(Alert);
        Vue.use(Icon)
        Vue.use(Header)
        Vue.use(Aside)
        Vue.use(Main)
        Vue.use(Table)
        Vue.use(TableColumn)
        Vue.use(Button)
        Vue.use(Container)
        //element ui typescript 已经做了
        /* Vue.prototype.$msgbox = MessageBox;
        Vue.prototype.$alert = MessageBox.alert;
        Vue.prototype.$confirm = MessageBox.confirm;
        Vue.prototype.$prompt = MessageBox.prompt;
        Vue.prototype.$message = Message; */
      }
  }

  export default element
