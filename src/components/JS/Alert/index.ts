import Vue from 'vue';
import MessageBox from './messageBox.vue';
export const messageBox = function(opts: any){
  
        const mixin = {
            data: function () {
              return {   
                title : 'title',
                content : '',
                cancel : '',
                ok : '',
                handleCancel : null,
                handleOk : null
              }
            }
          }
          const MyComponent = Vue.extend(MessageBox);

        const vm = new MyComponent({
            // el : document.createElement('div'),
            mixins:[mixin],
            data : opts,
            methods : {
                handleCancel1(){
                    this.handleCancel && this.handleCancel.call(this);
                    document.body.removeChild( this.$el );
                },
                handleOk1(){
                    this.handleOk && this.handleOk.call(this);
                    document.body.removeChild( this.$el );
                }
            }
        }).$mount();

        document.body.appendChild( vm.$el );


};