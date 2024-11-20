
import Header from './Header';
import Aside from './Aside';

function ParentComponent(props) {


    return (
        <div>
            <Header handleAsideOpen={props.appAsideOpen} />
            <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen} />
            {/* Other content of your ParentComponent */}
        </div>
    );
}

export default ParentComponent;
