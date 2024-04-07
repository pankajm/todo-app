interface Props {
  username: string;
  password: string;
}

const login = async ({ username, password }: Props) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(username + ":" + password),
    },
  });
  return await response.json();
};

export default {
  login,
};
