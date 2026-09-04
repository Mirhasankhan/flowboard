import Image from "next/image";
import faqImage from "../../assets/faq.png";
import Container from "@/utils/Container";

const Faq = () => {
  return (
    <Container>   
      <div>
        <Image src={faqImage} alt="faq" height={400} width={500}></Image>
      </div>
    </Container>
  );
};

export default Faq;
