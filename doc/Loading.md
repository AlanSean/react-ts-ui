### Loading



```
#组件
import { Loading }  from 'react-ui';

#style
import 'react-ui/es/Loading/style';


#重复使用  修改flag状态
<Loading flag={flag}/>

#非重复使用
const { data } = this.state;
if(data==null) <Loading />;

return (
    <div></div>
)
```