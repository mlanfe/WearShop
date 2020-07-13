import {request} from './request'

export function getDetailMultidata(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
