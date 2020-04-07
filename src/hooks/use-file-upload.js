export const useFileUpload = () => {
   const HiddenInput = () => (
    <input
      type="file"
      ref={ref}
      onChange={onChange}
      style={{ display: 'none' }}
    />
  )
}