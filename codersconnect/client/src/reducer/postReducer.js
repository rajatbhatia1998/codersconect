const initialState = {
    posts:[],
    feeds:[]
}



export const postReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_POSTS":
            return{
                ...state,
                posts:action.payload
            }
        case "SET_FEEDS":
            return {
                ...state,
                feeds:action.payload
            }


        default:
            return state
    }
}