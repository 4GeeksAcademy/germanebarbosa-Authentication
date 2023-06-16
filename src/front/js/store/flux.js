const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth: false,
			user_info:[]
		},
		actions: {
			login: (email,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				};
				fetch("https://germanebarbosa-studious-space-funicular-j64wgj5jpw7cp5p6-3001.preview.app.github.dev/api/login", requestOptions)
					.then(response => {
						console.log(response.status); //imprimo la validacion del codigo, 200 es correcto 401 significa error.
						if( response.status === 200 ){
								setStore({auth: true}) // Modifico el valor de la variable auth.
							}else return alert("Usuario o clave incorrecto")
						return response.json()
					})
					.then(data => {
						localStorage.setItem("token", data.access_token)
						console.log(data)
					});
			},

			signup: (email,password) => {
				const requestOptions = {
					method: 'POST',
					headers: { 'Content-Type':'application/json'},
					body: JSON.stringify(
						{
							"email": email,
							"password": password
						}
					)
				};
				fetch("https://germanebarbosa-studious-space-funicular-j64wgj5jpw7cp5p6-3001.preview.app.github.dev/api/signup", requestOptions)
					.then(response =>response.json())
					.then(data => console.log(data));
			},
			
			get_user_information:() => {
				const requestOptions = {
					method: 'GET'};
				  fetch("https://germanebarbosa-studious-space-funicular-j64wgj5jpw7cp5p6-3001.preview.app.github.dev/api/user", requestOptions)
					.then(response => response.json())
					.then(data => {
						setStore({user_info: data})
						console.log(data)
					})
					.catch(error => console.log('error', error));
			},

			logout:() => {
				setStore({auth: false}) 
				localStorage.removeItem("token")
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			}
		}
	};
};

export default getState;
