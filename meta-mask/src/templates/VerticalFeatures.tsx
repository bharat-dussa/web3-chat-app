import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Section } from '../layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Chat DApp"
    description="Welcome to our secure chat application! Our platform is built on the blockchain and uses Metamask wallet to ensure your conversations are private and secure."
  >
    <VerticalFeatureRow
      title="Secure messaging"
      description="Our platform uses blockchain technology to ensure that your messages are encrypted and secure."
      image="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
      imageAlt="First feature alt text"
    />
    <VerticalFeatureRow
      title="Metamask wallet integration"
      description="Log in easily with your Metamask wallet and keep your conversations private."
      image="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
      imageAlt="Second feature alt text"
      reverse
    />
    <VerticalFeatureRow
      title="User-friendly interface"
      description="Our chat app is easy to use and intuitive, making it simple to start chatting with friends and family."
      image="/assets/images/feature3.svg"
      imageAlt="Third feature alt text"
    />
    <VerticalFeatureRow
      title="Group chat"
      description="Create private groups to chat with multiple people at once."
      image="/assets/images/feature3.svg"
      imageAlt="Third feature alt text"
      reverse
    />
  </Section>
);

export { VerticalFeatures };
