
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
                setError(error);
                return Promise.reject(error);
            });
        }, []);

        const resInterceptor = useMemo(() => {
            return instance.interceptors.response.use(req => {
                return req
            }, error => {
                setError(error);
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
                        title="Xəta Bildirişi"
                        dispatch={() => { }}
                        onClose={() => setError(null)}
                        buttons={[]}>
                        <p>{error.message}</p>
                    </Modal>
                }
                <WrappedComponent {...props} />
            </Fragment>
        )
    }
}

export default withErrorHandler;