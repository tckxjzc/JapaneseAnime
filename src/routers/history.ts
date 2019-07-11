import {createHashHistory} from 'history';

const history=createHashHistory();
// history.listen(function (e) {
//     console.log(e)
// });
export default history;


export function goHome() {
    history.push('/');
}
