import React,{Component} from "react";
import { DatePicker ,Button} from 'antd';


class List extends Component{
    render(){
        return (
            <div>
                <DatePicker></DatePicker>
                <Button type="primary" icon="download">提交</Button>
            </div>
        )
    }
}
export default List