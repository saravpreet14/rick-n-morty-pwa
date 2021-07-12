var data =  [{user:"phani@123",msg:"Who created Rick and Morty?"},
{user:"sarav@123",msg:"Justin Roiland"},
{user:"sprinklr@123",msg:"@sarav, And also Dan Harmon"},
{user:"aneree@123",msg:"What do you think is the best episode ?"},
{user:"dhruv@123",msg:"Pilot episode :)"}];


 export async function getForumData(){
    //  console.log(data);
    return data; 
}

export function AddData(user_data){
    data =[...data,user_data];
}