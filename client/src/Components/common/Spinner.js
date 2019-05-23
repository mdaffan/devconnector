import source from './source.gif'

export default () => {
  return (
    <div>
      <img
        src={source}
        style={{
          width: '200px',

          margin: 'auto',
          display: 'block'
        }}
        alt="Loading...."
      />
    </div>
  )
}
