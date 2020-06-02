const initialState = {
    isLoad:false
}



export const laodingReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_LOADING":
            return {
                isLoad:action.payload
            }
        default:
            return state
    }
}