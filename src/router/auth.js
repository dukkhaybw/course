export default [
  {
    path:'contact',
    name:'Contact',
    component:{
      render(h){
        return h(<h1>联系我们</h1>)
      }
    }
  },
  {
    path:'serve',
    name:'Serve',
    component:{
      render(h){
        return h(<h1>服务</h1>)
      }
    }
  }
]