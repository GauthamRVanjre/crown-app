export function formDate(dateString: string) {
  const date = new Date(dateString);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
    date.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  //   console.log(formattedDate);

  return formattedDate;
}