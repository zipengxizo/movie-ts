<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
    name:'Scroller',
    props:{
        handleToScroll:{
            type:Function,
            default:null
        },
        handleToTouchEnd:{
            type:Function,
            default:null
        }
    },
    mounted(){
        const scroller = new BetterScroll( this.$refs.wrapper,{
            tap:true,
            probeType:1
        });
        

        scroller.on('scroll',(pos)=>{
            this.$emit('handleToScroll',pos)
            //this.handleToScroll(pos);
        });
        scroller.on('touchEnd',(pos)=>{
            this.$emit('handleToTouchEnd',pos);
            // this.handleToTouchEnd(pos);
        });
    },
    methods:{
        
    }

}
</script>

<style scoped>
.wrapper{height: 100%;}
</style>