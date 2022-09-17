import { FaSpinner } from 'react-icons/fa'

const Loader = () => {
  return (
    <h2 className="text-center text-xl mt-[8rem]">
      Loading...
      <FaSpinner className="text-center text-4xl mx-auto mt-3 animate-spin" />
    </h2>
  )
}

export default Loader