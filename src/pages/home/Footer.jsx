export const Footer = () => {
    return (
        <div className="footer">
            <div class="row">
                <div class="col-sm-2 col-md-2 item"></div>
                <div class="col-sm-5 col-md-2 item">
                    <h3>Services</h3>
                    <ul>
                        <li>
                            <a href="/#">Nuôi dạy trẻ</a>
                        </li>
                        <li>
                            <a href="/#">Từ thiện</a>
                        </li>
                        <li>
                            <a href="/#">Hoạt động</a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-6 col-md-3 item">
                    <h3>About</h3>
                    <ul>
                        <li>
                            <a href="/#">Thông tin</a>
                        </li>
                        <li>
                            <a href="/#">Liên hệ</a>
                        </li>
                        <li>
                            <a href="/#">Quảng bá</a>
                        </li>
                    </ul>
                </div>
                <div class="col item social">
                    <a href="/#">
                        <i class="icon ion-social-facebook"></i>
                    </a>
                    <a href="/#">
                        <i class="icon ion-social-twitter"></i>
                    </a>
                    <a href="/#">
                        <i class="icon ion-social-snapchat"></i>
                    </a>
                    <a href="/#">
                        <i class="icon ion-social-instagram"></i>
                    </a>
                </div>
            </div>
            <p class="copyright">CYF Center © 2022</p>
        </div>
    );
};
