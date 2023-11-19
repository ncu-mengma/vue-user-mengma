const getters = {
  // sidebar: state => state.app.sidebar,
  // size: state => state.app.size,
  // device: state => state.app.device,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  showLogin: state => state.user.showLogin,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickName: state => state.user.nickName,
  // introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  // permission: state => state.user.permission,
  // permission_routes: state => state.permission.routes,
  // errorLogs: state => state.errorLog.logs,
  // searchItem: (state) => (index) => state.search.searchItem[index],
  // permissionMenu: state => state.permission.permissionMenu,
  fanCount: state => state.user.fanCount,
  followCount: state => state.user.followCount,
  account: state => state.user.account,
  sex: state => state.user.sex,
  mail: state => state.user.mail,
  // resetFlag: state => state.permission.resetFlag
  //   getselectedNav:(state)=>{
  //     const selectedmenuname=[];
  //     if(state.current!=-1){
  //         selectedmenuname.push(state.leftMenus[state.current].name); 
  //         if(state.childCheckedIndex!=-1){
  //             console.log("current:"+state.current+"childCheckedIndex:"+state.childCheckedIndex);
  //             selectedmenuname.push(state.leftMenus[state.current].children[state.childCheckedIndex].name);

  //         }   

  //     }
  //     return selectedmenuname;
  // },
}
export default getters
