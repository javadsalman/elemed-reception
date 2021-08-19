
import { useEffect, useMemo, useState, Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

function withErrorHandler(WrappedComponent, instance) {

    return (props) => {
    const [error, setError] = useState(null);

        const reqInterceptor = useMemo(() => {
            return instance.interceptors.request.use(req => {
                // setError(null);
                return req;
            }, error => {
                setError(error.message)
                return Promise.reject(error);
            });
        }, []);

        const resInterceptor = useMemo(() => {
            return instance.interceptors.response.use(res => {
                return res
            }, error => {
                if (error.response.status === 401) {
                    setError('Giriş müddəti başa çatdı. Davam etmək üçün çıxış edib, yenidən daxil olun!')
                }
                else if (error.response.status === 404) {
                    setError(null);
                }
                else {
                    setError(error.message);
                }
                return Promise.reject(error);
            });
        }, []);

        useEffect(() => {
            return () => {
                instance.interceptors.request.eject(reqInterceptor);
                instance.interceptors.response.eject(resInterceptor);
            }
        }, [reqInterceptor, resInterceptor]);


        return (
            <Fragment>
                {
                    error
                    &&
                    <Modal
                        title="Bildiriş"
                        dispatch={() => { }}
                        onClose={() => setError(null)}
                        buttons={[]}>
                        <p>{error}</p>
                    </Modal>
                }
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}


export default withErrorHandler;