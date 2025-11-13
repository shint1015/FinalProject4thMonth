import SubMenu from '../components/common/subNav'

// call default from API

export default function Profile(){
    return (
        <>
        <div className='px-[2rem] sm:px-[3rem] lg:px-[5rem]'>
            <h4 className="mt-8 text-primary-yellow text-h4">Welcome back !</h4>
            <SubMenu/>
        </div>
        </>
    )
}