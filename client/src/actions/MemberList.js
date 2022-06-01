import * as api from '../api/ApiIndex.js';

export const getMembersBySearch = (searchQuery) => async (dispatch) => {
    try {
        api.fetchMembersBySearch(searchQuery)
        .then(({data: {data}}) => {
            if(data){
                //console.log(data.phoneNumber);
                alert("Found a member, directing to /service-request/member");
            } else {
                alert("No member found");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}