import "./Switch.css";

const Switch = ({value,onChange})=>{

    return (
        <label class="switch">
            <input type="checkbox" defaultChecked={value} onChange={()=>{onChange(!value)}}/>
            <span class="slider round"></span>
        </label>
    )
}

export default Switch;