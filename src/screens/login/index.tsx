import { FormEvent } from "react";

// interface Base {
//   id: number
// }
// interface Person extends Base{
//   name: string
// }
// // inheritence
// const p: Person = {name: '123', id: 12}
const apiUrl = process.env.REACT_APP_API_URL;

// duck typing: interface oriented programming > oop
export const LoginScreen = () => {
  const login = (param: {username: string, password:string}) => {
    fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param)
    }).then(
      async (response: Response) => {
        if (response.ok) {
        }
      }
    );
  }
  // HTMLFormElement or Element 可以用更精准的子类型 或 父类型
  const handleSubmit =(event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault()  // 阻止表单提交的默认行为
    // type assertion
    const username = (event.currentTarget.elements[0] as HTMLFormElement).value
    const password = (event.currentTarget.elements[1] as HTMLFormElement).value
    login({username: username, password: password})
  }
  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">Username</label>
      <input type="text" id={'username'}/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id={'password'}/>
    </div>
    <button type={'submit'}>Login</button>
  </form>
}
// 测试使用json server, json server只能模拟标准restful api,
// /login不行
// 实际情况下 能永远符合restful的情况时很少的
